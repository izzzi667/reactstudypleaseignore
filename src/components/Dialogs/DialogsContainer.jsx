import React from 'react';
import Message from './Message/Message.jsx';
import { AddMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs.jsx';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.js';
import { compose } from 'redux';

/*
const DialogsContainer = (props) => {
   
    let state = props.store.getState();

    let addMessage =() =>
    {        
        props.store.dispatch(AddMessageActionCreator());
    }

    let modifyNewMessage = (text) =>
    {                
        props.store.dispatch(onMessageChangeActionCreator(text));
    }

    return (
        <Dialogs dialogData = {state.messagesPage.dialogsData} messageData={state.messagesPage.messagesData} newMessageText={state.messagesPage.newMessageText}
            modifyNewMessage = {modifyNewMessage} addMessage={addMessage}
        />
    );
}

export default DialogsContainer;

*/
let mapStateToProps=(state)=>
{
    return    {
        dialogData: state.messagesPage.dialogsData,
        messageData: state.messagesPage.messagesData,
        newMessageText: state.messagesPage.newMessageText,
    }
}


let mapDispathcToProps = (dispatch) =>
{
    return {
        addMessage: (newMessageBody)=>{
            dispatch(AddMessageActionCreator(newMessageBody));
        }/*,
        modifyNewMessage: (text)=>{
            dispatch(onMessageChangeActionCreator(text));
        }*/


    }

}



export default compose(
    connect (mapStateToProps,mapDispathcToProps),
    withAuthRedirect
)(Dialogs);

//Аналогично
/*
let AuthRedirectComponent = withAuthRedirect(Dialogs);  //Hoc

const DialogsContainer = connect (mapStateToProps,mapDispathcToProps)(AuthRedirectComponent);

export default DialogsContainer;

*/