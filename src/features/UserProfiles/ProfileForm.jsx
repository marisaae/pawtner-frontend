import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as userActions from './userSlice'; //get profile and update profile
import { getUserProfileState } from './userSlice';


const ProfileForm = () => {

  const dispatch = useDispatch();
  const profileState = useSelector(getUserProfileState);

  const [firstName, setFirstName] = useState(profileState.firstName);
  const [lastName, setLastName] = useState(profileState.lastName);
  const [bio, setBio] = useState(profileState.bio);


  return (
    <div>
      <div>Profile Form</div>
    <form>
    <label>
      First Name
      <input
        type="text"
        value={firstName}
        onChange={}
        required />
    </label>
    <label>
      Last Name
      <input
        type="text"
        value={lastName}
        onChange={}
        required />
    </label>
    <label>
      Bio
      <input
        type="text"
        value={bio}
        onChange={}
        />
    </label>
    <button>Discard Changes</button>
    <button>Save</button>
    </form>
   </div>
  )
}

export default ProfileForm