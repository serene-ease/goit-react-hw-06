import { createSlice } from "@reduxjs/toolkit"; 
import initContacts from '../helpers/initialContacts.json'

// export const addContact = () =>{}
// export const removeContact = ()=> {}


const contacsPersistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const contacsSlice = createSlice(
    {
        name: contacts,
        initialState: initContacts,
        reducers: {
            add: (state, addContact) => {},
            remove: (state, removeContact ) => {}
        }
    }
)
export const {addContact, removeContact} = contacsSlice.actions;
export const contactsReducer = contacsSlice.reducer;