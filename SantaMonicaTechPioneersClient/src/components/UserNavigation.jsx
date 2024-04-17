import './css/UserNavigation.css'
import vector from '../assets/Vector.svg'
import vector1 from '../assets/Vector1.svg'
import vector2 from '../assets/Vector2.svg'
import vector3 from '../assets/Vector3.svg'
import vector4 from '../assets/Vector4.svg'
import vector5 from '../assets/Vector5.svg'
import techin from '../assets/techin-logo.svg'
import greenLogo from '../assets/green-logo.svg'

export const UserNavigation = ()=> {

    return( 


          <div className="Left-Nav">
            <div className="green-logo">
            <img src={greenLogo} alt="green-logo" />
       <img className="techin-logo" src={techin} alt="techin-logo"/>
</div>
        <ul className="text-ul">
          <li className="text-li"><img className="logos" src={vector} alt="timeline"/><a className="text-list" href="#">Timeline</a></li>
          <li className="text-li"><img className="logos" src={vector1} alt="timeline"/><a className="text-list"href="#">Backlog</a></li>
          <li className="text-li"><img className="logos" src={vector2} alt="timeline"/><a className="text-list"href="#">Board</a></li>
          <li className="text-li"><img className="logos" src={vector3} alt="timeline"/><a className="text-list"href="#">Reports</a></li>
          <li className="text-li"><img className="logos" src={vector4} alt="timeline"/><a className="text-list"href="#">Issues</a></li>
          <li className="text-li"><img className="logos" src={vector5} alt="timeline"/><a className="text-list"href="#">Project settings</a></li>
        </ul>
      </div>
      
      
    )
}