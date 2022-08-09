import { Action, Room, RoomStore } from "../../interface/redux";

const defaultState: RoomStore = {

    room: null

}

const newDataRoom = 'new_data_room';

export const AllRoom = (state = defaultState, action:Action<string, Room | Room[]>) => {

    switch (action.type){
        case newDataRoom: 
            return {room: action.payload};
        default:
            return state;
    }

}

export const newRoomData = (payload: any) => ({ type: newDataRoom, payload });
