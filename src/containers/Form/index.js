/* eslint-disable react/require-default-props */

import { useCallback, useState, useRef } from "react"; // ajout du hook useRef
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const formRef = useRef(null); // Création d'une référence pour le formulaire (pour le réinitialiser)

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // essai appel mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Appel de la fonction onSuccess après un envoi réussi
        formRef.current.reset(); // Réinitialiser le formulaire
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form ref={formRef} onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field 
          placeholder="" 
          label="Email" 
          // type="email"
          // required    champs obligatoire pour envoi du message
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default Form;

