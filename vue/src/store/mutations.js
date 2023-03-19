export function logout(state){
    state.user.token = null;
    state.user.data = {};
    sessionStorage.removeItem("TOKEN");
}

export function setUser(state, user){
    state.user.data = user;
}

export function setToken(state, token){
    state.user.token = token;
    sessionStorage.setItem("TOKEN", token);
}

export function setDashboardData(state, data){
    state.dashboard.data = data;
}

export function dashboardLoading(state, loading){
    state.dashboard.loading = loading;
}

export function setSurveysLoading(state, loading){
    state.surveys.loading = loading;
}

export function setSurveys(state, surveys){
    state.surveys.links = surveys.meta.links;
    state.surveys.data = surveys.data;
}

export function setCurrentSurveyLoading(state, loading){
    state.currentSurvey.loading = loading;
}

export function setCurrentSurvey(state, survey){
    state.currentSurvey.data = survey.data;
}

export function notify(state, {message, type}){
    state.notification.show = true;
    state.notification.type = type;
    state.notification.message = message;
    setTimeout(() => {
      state.notification.show = false;
    }, 3000)
}

