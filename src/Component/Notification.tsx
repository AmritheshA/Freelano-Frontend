import { requestPermission } from '@/Config/FirebaseConfig/FirebaseConfig'
import { useEffect } from 'react'

function Notification() {

    useEffect(() => {
        const data = async () => {
            const deviceToken = await requestPermission();
            console.log("🚀 ~ data ~ deviceToken:", deviceToken)
        }
        data();
    }, [])


    return (
        <div>Notification</div>
    )
}

export default Notification