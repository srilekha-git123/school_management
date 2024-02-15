    import { environment } from "src/environments/environment.development";

    export const ApiReference = {
        oauthLogin : `${environment.backend.auth_host}/authenticate`, 
        oauthLogout : `${environment.backend.auth_host}/signout`,
        studentDetails : `${environment.backend.school_host}/student`,
        teacherDetails : `${environment.backend.school_host}/exam-details`
    }
    
  