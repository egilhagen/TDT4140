import { useParams } from "react-router-dom";

export default function Profile() {
  /* Params gets parameters from the url, ie the username from: /profile/username. the username-key is defined in index.js: path=":username" */
  /* TODO: finn ut av kordan ein kan koble til redux-state her, evt sjå om ein kan bruke useParams() med ein klassebasert komponent */
  let params = useParams();
  return (
    <div>
      <h2>Profile: {params.username}</h2>
      <h5>
        TODO: mat inn verdier (og edit-knapp dersom
        this.props.auth.user.username==params.username)
      </h5>
      <h4>Avatar </h4>
      <h4>Name: </h4>
      <h4>Last name: </h4>
      <h4>Email: </h4>
      <br />
    </div>
  );
}
