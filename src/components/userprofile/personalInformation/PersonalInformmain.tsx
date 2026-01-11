import React, { useState } from 'react'
import PersonalInformationContainer from './container/PersonalInformationContainer'
import PersonalDataShow from './PersonalDataShow'


const PersonalInformmain = () => {
    const [edit,setEdit]=useState(false)
  return (
    <section>
         <div className='container mx-auto'>
              {edit ? <PersonalInformationContainer /> : <PersonalDataShow onSetEdit={setEdit} edit={edit} />

              }
         </div>
    </section>
  )
}

export default PersonalInformmain