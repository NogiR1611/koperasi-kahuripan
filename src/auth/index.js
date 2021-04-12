export const isLogin = () => {
    const data = localStorage.getItem('TOKEN_KEY');
    if(data){
        return true;
    }

    return false;
} 