import React from 'react'
import AlertCard from '../components/cards/alertCard'

const AllAlerts = () => {
  return (
    <div>
       
        <div className='w-full flex flex-col justify-center items-center gap-8 mx-8 px-6 py-4'>
            <AlertCard title='Possible High rain' desc='Possible High rain in your locality by end of this week!'/>
            <AlertCard title='Possible High rain' desc='Possible High rain in your locality by end of this week!'/>
            <AlertCard title='Possible High rain' desc='Possible High rain in your locality by end of this week!'/>
            
        </div>
    </div>
  )
}

export default AllAlerts