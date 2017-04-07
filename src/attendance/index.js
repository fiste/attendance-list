import React, { Component } from 'react'
import update from 'react-addons-update'
import c from 'classnames'

import Students from '../students'
import Attendee from '../attendee'
import { StudentImage } from '../attendee/students'

export default class Attendance extends Component {
  constructor(props){
    super(props)
    this.state = {
      attendanceMark: {
        present: [],
        late: [],
        absent: []
      },
      unmarked: Students.length,
      reset: false,
      done: false
    }
    this.baseState = this.state 
  }

  presentCount = (e) => {
    this.setState(update(this.state, {
       attendanceMark: {
         present: {
          $push: [e]
        }
      },
      unmarked: {$set: this.state.unmarked -1}
    }))
  }

  lateCount = (e) => {
    this.setState(update(this.state, {
       attendanceMark: {
         late: {
          $push: [e]
        }
      },
      unmarked: {$set: this.state.unmarked -1}
    }))
  }

  absentCount = (e) => {
    this.setState(update(this.state, {
       attendanceMark: {
         absent: {
          $push: [e]
        }
      },
      unmarked: {$set: this.state.unmarked -1}
    }))
  }

  componentDidUpdate() {
    this.state.reset && this.setState(this.baseState)
  }

  totalPresentStudents = () => {
    let total = []
    
    Students.map((data, i) => {
      this.state.attendanceMark.present.includes(data.id) && total.push(`${data.firstName} ${data.lastName}`)
    })

    let res = total.join(', ')
    res = res === '' ? res = 0 : res
    
    return res
  }

  totalLateStudents = () => {
    let total = []
    
    Students.map((data, i) => {
      this.state.attendanceMark.late.includes(data.id) && total.push(`${data.firstName} ${data.lastName}`)
    })
    
    let res = total.join(', ')
    res = res === '' ? res = 0 : res
    
    return res
  }

  totalAbsentStudents = () => {
    let total = []
    
    Students.map((data, i) => {
      this.state.attendanceMark.absent.includes(data.id) && total.push(`${data.firstName} ${data.lastName}`)
    })
    
    let res = total.join(', ')
    res = res === '' ? res = 0 : res
    
    return res
  }

  updateReset = () => {
    this.setState({
      reset: true
    })
  }

  reset = () => {
    this.updateReset()
  }

  done = () => {
    this.setState({
      done: true
    })
    this.totalPresentStudents()
  }

  closeModalButton = (e) => {
    e.keyCode === 27 && this.setState({
      done: false
    })
  }

  closeModal = () => {
    this.setState({
      done: false
    })
  }

  render () {
    let { firstName, lastName } = Students
    let { image } = StudentImage
    let { unmarked, reset, done, attendanceMark } = this.state

    let present = attendanceMark.present == [] ? 0 : attendanceMark.present
    let late = attendanceMark.late == [] ? 0 : attendanceMark.late
    let absent = attendanceMark.absent == [] ? 0 : attendanceMark.absent

    return <div onKeyDown={this.closeModalButton}>
      {Students.map((data, i) => <Attendee firstName={data.firstName}
                                  lastName={data.lastName}
                                  id={data.id}
                                  image={StudentImage[i]}
                                  reset={reset}
                                  onClickPresent={this.presentCount}
                                  onClickLate={this.lateCount}
                                  onClickAbsent={this.absentCount}
                                  key={i} />)}
      <div className={c('studentMarks', {'done': done})}>
        <div className='stats'>
          <div className='counter'>
            <p>Present: {present.length}</p>
            <p>Late: {late.length}</p>
            <p>Absent: {absent.length}</p>
            <p>Unmarked: {unmarked}</p>
          </div>
          <div className='total'>
            <button className='closeModalButton' onClick={this.closeModal}>
              <span className='closeModal'></span>
            </button>

            <h2>Total attendees</h2>
            <table className='totalTable'>
              <tbody>
                <tr>
                  <td>Present:</td>
                  <td>{this.totalPresentStudents()}</td>
                </tr>
                <tr>
                  <td>Late:</td>
                  <td>{this.totalLateStudents()}</td>
                </tr>
                <tr>
                  <td>Absent:</td>
                  <td>{this.totalAbsentStudents()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className='controls'>
        <button className='reset' onClick={this.reset}>Reset</button>
        <button className='done' onClick={this.done}>Done</button>
      </div>
    </div>
  }
}
