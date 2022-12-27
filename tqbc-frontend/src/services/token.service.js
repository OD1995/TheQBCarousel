class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.accessToken;
    }

    updateLocalAccessToken(newAccesstoken) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.accessToken = newAccesstoken;
        localStorage.setItem("user",JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    setUser(user) {
        // console.log(JSON.stringify(user));
        localStorage.setItem("user",JSON.stringify(user));
    }

    getPrivateLeaderboardInfoList() {
        return JSON.parse(localStorage.getItem("privateLeaderboardInfoList"));
    }

    getPrivateLeaderboardInfoDict() {
        return JSON.parse(localStorage.getItem("privateLeaderboardInfoDict"));
    }

    getPrivateLeaderboardUUIDs() {
        return JSON.parse(localStorage.getItem("privateLeaderboardUUIDs"));
    }

    getPrivateLeaderboardNames() {
        return JSON.parse(localStorage.getItem("privateLeaderboardNames"));
    }

    setPrivateLeaderboardInfos(privateLeaderboardInfos) {
        localStorage.setItem("privateLeaderboardInfoList",JSON.stringify(privateLeaderboardInfos));
        let privateLeaderboardInfoDict = {};
        let privateLeaderboardUUIDs = [];
        let privateLeaderboardNames = [];
        for (const pli of privateLeaderboardInfos) {
            privateLeaderboardInfoDict[pli.uuid] = pli;
            privateLeaderboardUUIDs.push(pli.uuid);
            privateLeaderboardNames.push(pli.name);
        }
        localStorage.setItem("privateLeaderboardUUIDs",JSON.stringify(privateLeaderboardUUIDs));
        localStorage.setItem("privateLeaderboardInfoDict",JSON.stringify(privateLeaderboardInfoDict));
        localStorage.setItem("privateLeaderboardNames",JSON.stringify(privateLeaderboardNames));
    }

    removePrivateLeaderboardInfos() {
        localStorage.removeItem('privateLeaderboardInfos');
    }

    removeUser() {
        localStorage.removeItem('user');
    }

    getJustLoggedOut() {
        return JSON.parse(localStorage.getItem("justLoggedOut"));
    }

    setJustLoggedOut(jlo) {
        localStorage.setItem('justLoggedOut',jlo);
    }
}

export default new TokenService();