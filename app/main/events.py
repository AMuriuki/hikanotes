from flask import session
from flask_socketio import emit, join_room, leave_room
from .. import socketio
from app.models import Chat, User
from flask_login import current_user


@socketio.on('joined', namespace='/chats')
def joined(message):
    """Sent by clients when they enter a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    join_room(room)
    emit('status', {'msg': session.get('name') + ' has entered the room.'}, room=room)


@socketio.on('text', namespace='/chats')
def text(message):
    """Sent by a client when the user entered a new message.
    The message is sent to all people in the room."""
    room = session.get('room')
    print(room)
    username = session.get('name')
    user = db.session.query(User).filter_by(username=username)
    chat = Chat(author=current_user, recipient=user,
                      body=message['msg'])
    db.session.add(chat)
    emit('message', {'msg': session.get('name') + ':' + message['msg']}, room=room)


@socketio.on('left', namespace='/chats')
def left(message):
    """Sent by clients when they leave a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    leave_room(room)
    emit('status', {'msg': session.get('name') + ' has left the room.'}, room=room)

