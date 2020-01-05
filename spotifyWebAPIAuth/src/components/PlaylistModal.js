import React from 'react';
import ReactDOM from 'react-dom';

const PlaylistModal = (props, song) => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active playListModall">
            <div onClick={(e) => { e.stopPropagation() }} className="ui standard modal visible active">
                <div className="header">
                    {props.title}
                    <i class="fas fa-plus"></i>
                </div>
                <div className="content">
                    { props.content }
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#playlistModal')
    );
};

export default PlaylistModal;