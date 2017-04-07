import React, { Component } from 'react'
import c from 'classnames'

export default class Attendee extends Component {
  constructor(props){
    super(props)
    this.state = {
      markPresent: false,
      markLate: false,
      markAbsent: false
    }
    this.baseState = this.state 
  }

  present = (id) => {
    this.setState({
      markPresent: true
    }, this.props.onClickPresent(this.props.id))
  }

  late = (id) => {
    this.setState({
      markLate: true
    }, this.props.onClickLate(this.props.id))
  }

  absent = (id) => {
    this.setState({
      markAbsent: true
    }, this.props.onClickAbsent(this.props.id))
  }

  reset = () => {
    this.setState(this.baseState)
  }

  componentWillReceiveProps(nextProps) {
    nextProps.reset && this.reset()
  }

  render () {
    let { firstName, lastName, image, id, onClickPresent, onClickLate, onClickAbsent } = this.props
    let { markPresent, markLate, markAbsent } = this.state
    let name = `${firstName} ${lastName}`
    let studentMarked = markPresent || markLate || markAbsent

    return <div className={c('attendee', {'present': markPresent}, {'late': markLate}, {'absent': markAbsent})}>
      <img className='studentImage' src={image} />
      <p className='studentName'>{name}</p>
      
      {!studentMarked ? <div>
        <button className='markStudent' onClick={this.present}>
          <span className='markPresent'></span>
        </button>
        <button className='markStudent' onClick={this.late}>
          <span className='markLate'></span>
        </button>
        <button className='markStudent' onClick={this.absent}>
          <span className='markAbsent'></span>
        </button>
      </div> : <span className={c('marked', {'markPresent': markPresent}, {'markLate': markLate}, {'markAbsent': markAbsent})}></span>}
    </div>
  }
}