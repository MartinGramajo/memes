import FormLogin from "../components/FormLogin";

export default function Login({ setUser,requestUserData }) {
  return (
    <div>
      <FormLogin setUser={setUser} requestUserData={requestUserData} />
    </div>
  );
}
