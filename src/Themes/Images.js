import StaticVar from "../Config/StaticVar"
import heart from '../Assets/Images/heart.png'
import report from '../Assets/Images/report.png'
import logoicon from '../Assets/Images/logo-icon.png'
import danger from '../Assets/Images/danger.png'

const Images = {
    traindriver: StaticVar.URL_API + "/upload/repo/img/traindriver.png",
    doctor: StaticVar.URL_API + "/upload/repo/img/doctor.png",
    supervisor: StaticVar.URL_API + "/upload/repo/img/supervisor.png",
    report: report,// StaticVar.URL_API + "/upload/repo/img/report.png",
    heart:  heart,//StaticVar.URL_API + "/upload/repo/img/heart.png",
    danger: danger,//StaticVar.URL_API + "/upload/repo/img/danger.png",
    whitescanner: StaticVar.URL_API + "/upload/repo/img/whitescanner.png",
    checklist: StaticVar.URL_API + "/upload/repo/img/checklist.png",
    close: StaticVar.URL_API + "/upload/repo/img/close.png",
    logoIcon: logoicon
}

export default Images
