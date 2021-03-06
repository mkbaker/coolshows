import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TextField from '@material-ui/core/TextField';

class UpdateEvent extends Component {

  // similar to the NewEventForm, state is equal to an object that will be populated by the form
  // maybe throw data into the STORE -- to then be manipulated in local state to include changes but main prior data
  // reference the index of object to manipulate
  
  state={
    newEvent:{
        title: this.props.funEvent.title,
        address: this.props.funEvent.address,
        description: this.props.funEvent.description,
        date: this.props.funEvent.date,
        image_url: this.props.funEvent.image_url,
        bandcamp: this.props.funEvent.bandcamp,
     }
}
  
// this function handles the input fields on the form 
// and uses setState to change the values from empty strings to the data from the form
    handleChange= (keyname, event) => {
        event.preventDefault();
        this.setState({
          newEvent:{
            ...this.state.newEvent,
            [keyname]: event.target.value,
        }});
     }

   
      // this function passes the new state to our PUT request on the server side
         updateEvent = (event_id) => {
        console.log('whats up , were updating stuff!!!'  ,this.state, event_id);
        let event = {  
          title: this.state.newEvent.title,
          address: this.state.newEvent.address,
          description: this.state.newEvent.description,
          date: this.state.newEvent.date,
          image_url: this.state.newEvent.image_url,
          bandcamp: this.state.newEvent.bandcamp,
          event_id: event_id
        } 
        this.props.dispatch({type: 'UPDATE_ITEM', payload: event
        });

        this.props.handleClose();
        this.props.dispatch({ type: 'GOT_EVENTS'});
      }

  render() {
    return (
      <div>
          <form>

              <TextField  onChange={(event) => this.handleChange( 'title' , event)} 
                
                    type="text" id="" placeholder={this.props.funEvent.title}/>
                
                <TextField onChange={(event) => this.handleChange( 'address' , event)} 
                    type="text" id="" placeholder={this.props.funEvent.address}/>

                <TextField   onChange={(event) => this.handleChange( 'description' , event)} 
                                    type="text" id="" placeholder={this.props.funEvent.description}/>

                <TextField   onChange={(event) => this.handleChange( 'date' , event)} 
                                    type="text" id="" placeholder={this.props.funEvent.date}/>

                <TextField  onChange={(event) => this.handleChange( 'image_url' , event)} 
                                                    type="text" id="" placeholder='image link'/>

                <TextField  onChange={(event) => this.handleChange( 'bandcamp' , event)} 
                                                    type="text" id="" placeholder='bandcamp link'/>

                <button onClick={() => {this.updateEvent(this.props.funEvent.event_id)}} className='updateFormBtn'> submit </button>
                <button onClick={() => {this.props.handleClose()}} className='updateFormBtn'> cancel </button>

          </form>
         
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UpdateEvent);
