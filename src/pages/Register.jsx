import { useSearchParams } from 'react-router-dom';
import RegistrationForm from '../components/registration/RegistrationForm.jsx';
import Rangoli from '../components/decor/Rangoli.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { festival } from '../data/festival.js';

export default function Register() {
  useDocumentTitle('Register');
  const [params] = useSearchParams();
  const preselected = params.get('event') ?? '';

  return (
    <div className="register-page">
      <aside className="register-page__aside">
        <Rangoli className="register-page__rangoli" palette="night" />
        <div className="register-page__aside-inner">
          <p className="eyebrow">Registration</p>
          <h1 className="register-page__title">
            Take the <span className="serif-accent">stage.</span>
          </h1>
          <p className="register-page__text">
            Pick an event, tell us who you are, and get a confirmation reference. It takes under a minute.
          </p>
          <ol className="register-page__steps">
            <li>Choose an event — or arrive here from any event’s details.</li>
            <li>Fill in your details. We check each field as you go.</li>
            <li>Submit and get a demo reference number.</li>
          </ol>
          <p className="register-page__demo">
            <strong>This is a demonstration flow.</strong> Details are stored only in your browser and are not sent to
            SRMIST. {festival.nextEdition.label} registrations will be announced by the {festival.organiser}.
          </p>
        </div>
      </aside>

      <section className="register-page__form" aria-labelledby="reg-form-title">
        <h2 id="reg-form-title" className="register-page__form-title">
          Your details
        </h2>
        {/* key resets the form if the ?event= param changes */}
        <RegistrationForm key={preselected} initialEventId={preselected} />
      </section>
    </div>
  );
}
