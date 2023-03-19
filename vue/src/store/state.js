export default {
    user: {
        data: {},
        token: sessionStorage.getItem("TOKEN"),
      },
      dashboard: {
        loading: false,
        data: {}
      },
      surveys: {
        loading: false,
        links: [],
        data: []
      },
      currentSurvey: {
        data: {},
        loading: false,
      },
      questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
      mandatorys: {
        yes: true,
        no: false
      },
      notification: {
        show: false,
        type: 'success',
        message: ''
      }
}