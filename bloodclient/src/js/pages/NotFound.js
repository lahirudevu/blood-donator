import React from 'react';


export default class NotFound extends React.Component{

  render(){

    let _location = window.location.href;

    return(

      <div>
        404 Invalid URL
        <hr></hr>
        
        You have reached:  {_location}
      </div>

    )
  }

}