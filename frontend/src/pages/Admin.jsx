import { useState } from 'react'
import profile_pic from '../assets/profile-pic.png'
import robo from '/robot.gif'


const Admin = () => {

  const [userDate, setUserDate] = useState({
    name: 'Vaibhav Badiger',
    image: profile_pic,
    email: 'Badigervaibhav8@gmail.com',
    phone: '+91 9071861694',
    address: {
      line1: '37th Cross, Richmond',
      line2: 'Circle, Ring Road, London',
      
    },
    gender : 'Male',
    dob : '21-02-2002',
});


const [isEdit,setIsEdit] = useState(false)
  return (
    <div className='w-full gap-4 flex justify-center items-center '>

    
    <div className='max-w-lg flex flex-col gap-2 rounded-lg p-4 m-4 bg-white text-sm '>
        <img className='w-36 rounded' src={userDate.image} alt="" />
        {
          isEdit ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' value={userDate.name} onChange={(e) => setUserDate(prev => ({...prev, name: e.target.value}))} type="text" /> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userDate.name}</p>
        }

        <hr className='bg-zinc-400 h-[1px] border-none' />
        <div>
        <p className='text-neutral-500 underline mt-3'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>   
          
          <p className='font-medium'>Email Id: </p>
          <p className='text-blue-500'>{userDate.email}</p>
          <p className='font-medium'>Phone :</p>
          {
          isEdit ? <input className='bg-gray-100 max-w-52' value={userDate.phone} onChange={(e) => setUserDate(prev => ({...prev, phone: e.target.value}))} type="text" /> : <p className='text-blue-400'>{userDate.phone}</p>
        }

        <p className='font-medium'>Address: </p>
        {
          isEdit ? 
          <p>
            <input className='bg-gray-50' value={userDate.address.line1} onChange={(e) => setUserDate(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} type="text" />
            <br />
            <input className='bg-gray-50'  value={userDate.address.line2} onChange={(e) => setUserDate(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} type="text" />
          </p> :
          <p className='text-gray-500'>
            {
              userDate.address.line1
            }
            <br />
            {
              userDate.address.line2
            }
          </p>
        }
          
        </div>
        </div>

        <div>
          <p className='text-neutral-500 underline mt-3'>Basic Information</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Gender:</p>
            {
              isEdit ? 
              <select className='max-w-20 bg-gray-100' value={userDate.gender} onChange={(e) => setUserDate(prev => ({...prev, gender: e.target.value}))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select> : <p className='text-gray-400'>{userDate.gender}</p>
            }

            <p className='font-medium'>Date of Birth:</p>
            {
              isEdit ? <input className='max-w-28 bg-gray-100' value={userDate.dob} onChange={(e) => setUserDate(prev => ({...prev, dob: e.target.value}))} type="date" /> : <p className='text-gray-400'>{userDate.dob}</p>
            }
          </div>
        </div>

        <div className='mt-10'>
          {
            isEdit ? <button className='border hover:bg-blue-500 hover:text-white transition-all  border-primary px-8 py-2 rounded-full' onClick={() => setIsEdit(false)}>Save Information</button> : <button className='border hover:bg-blue-500 hover:text-white transition-all  border-primary px-8 py-2 rounded-full' onClick={() => setIsEdit(true)}>Edit</button>
          }
        </div>

    </div>

    <div className='w-1/2 '>
          <img className='w-full' src={robo} alt="" />
    </div>
    </div>
  )
}

export default Admin