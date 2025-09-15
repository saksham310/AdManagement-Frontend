import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const AdvertiserDashboard = ({group}: string) => {
    const authHeader = useAuthHeader()
    return <>
        Advertiser {authHeader}
    </>
}

export default AdvertiserDashboard;