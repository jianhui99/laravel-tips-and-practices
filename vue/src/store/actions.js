import axiosClient from "../axios";

export function register({commit}, user){
    return axiosClient.post('/register', user)
    .then(({data}) => {
      commit('setUser', data.user);
      commit('setToken', data.token)
      return data;
    })
}

export function login({commit}, user){
    return axiosClient.post('/login', user)
      .then(({data}) => {
        commit('setUser', data.user);
        commit('setToken', data.token)
        return data;
    })
}

export function logout({commit}){
    return axiosClient.post('/logout')
    .then(response => {
      commit('logout')
      return response;
    })
}

export function getUser({commit}){
    return axiosClient.get('/user')
    .then(res => {
      console.log(res);
      commit('setUser', res.data)
    })
}

export function getDashboardData({commit}){
    commit('dashboardLoading', true)
    return axiosClient.get(`/dashboard`)
    .then((res) => {
      commit('dashboardLoading', false)
      commit('setDashboardData', res.data)
      return res;
    })
    .catch(error => {
      commit('dashboardLoading', false)
      return error;
    })
}

export function getSurveys({commit}, {url = null} = {}){
    commit('setSurveysLoading', true)
    url = url || "/survey";
    return axiosClient.get(url).then((res) => {
      commit('setSurveysLoading', false)
      commit("setSurveys", res.data);
      return res;
    });
}

export function getSurvey({commit}, id){
    commit("setCurrentSurveyLoading", true);
    return axiosClient
      .get(`/survey/${id}`)
      .then((res) => {
        commit("setCurrentSurvey", res.data);
        commit("setCurrentSurveyLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentSurveyLoading", false);
        throw err;
      });
}

export function getSurveyBySlug({commit}, slug){
    commit("setCurrentSurveyLoading", true);
    return axiosClient
      .get(`/survey-by-slug/${slug}`)
      .then((res) => {
        commit("setCurrentSurvey", res.data);
        commit("setCurrentSurveyLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentSurveyLoading", false);
        throw err;
      });
}

export function saveSurvey({commit, dispatch}, survey){
    delete survey.image_url;

    let response;
    if (survey.id) {
      response = axiosClient
        .put(`/survey/${survey.id}`, survey)
        .then((res) => {
          commit('setCurrentSurvey', res.data)
          return res;
        });
    } else {
      response = axiosClient.post("/survey", survey).then((res) => {
        commit('setCurrentSurvey', res.data)
        return res;
      });
    }

    return response;
}

export function deleteSurvey({dispatch}, id){
    return axiosClient.delete(`/survey/${id}`).then((res) => {
        dispatch('getSurveys')
        return res;
      });
}

export function saveSurveyAnswer({commit},  {surveyId, answers}){
    return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
}
