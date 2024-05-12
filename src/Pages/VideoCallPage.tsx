import ClientVideoCall from '@/Component/Client/ClientVideoCall';
import FreelancerVideoCall from '@/Component/Freelancer/FreelancerVideoCall';
import { RootState } from '@/Redux/Store'
import { useSelector } from 'react-redux'

function VideoCallPage() {

    const user = useSelector((state: RootState) => state.userDetails.user);
    
    return (
        <div>
            {user.role == "FREELANCER" ? <FreelancerVideoCall/> : <ClientVideoCall />}
        </div>
    )
}

export default VideoCallPage