import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as userActions from './userSlice'; //get profile and update profile
import { getUserProfileState } from './userSlice';


const ProfileForm = () => {

  const dispatch = useDispatch();
  const profileState = useSelector(getUserProfileState);

  const [firstName, setFirstName] = useState(profileState?.firstName || '');
  const [lastName, setLastName] = useState(profileState?.lastName || '');
  const [bio, setBio] = useState(profileState?.bio || '');

  useEffect(() => {
    setFirstName(profileState?.firstName || '')
    setLastName(profileState?.lastName || '')
    setBio(profileState?.bio || '')
  }, [profileState])

  return (
    <div>
      <div>Profile Form</div>
    <form>
    <label>
      First Name
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required />
    </label>
    <label>
      Last Name
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required />
    </label>
    <label>
      Bio
      <textarea
      rows={3}
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.bio)}
        />
    </label>
    <button>Discard Changes</button>
    <button>Save</button>
    </form>
   </div>
  )
}

export default ProfileForm