import { onMessageListener, requestPermission } from '@/Config/FirebaseConfig/FirebaseConfig'
import React, { useEffect } from 'react'

function Notification() {



    useEffect(() => {
        const data = async () => {
            const deviceToken = await requestPermission();
            console.log(deviceToken)
        }
        data();
    }, [])


    return (
        <div>Notification</div>
    )
}

export default Notification