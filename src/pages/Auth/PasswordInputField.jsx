import { Form} from "react-bootstrap";


function PasswordInputField({
  handleValidation,
  handlePasswordChange,
  passwordValue,
  passwordError,
}) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="mb-2 text-muted" for="password">
          Password
        </Form.Label>
        <Form.Control
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onKeyUp={handleValidation}
          name="password"
          placeholder="Password"
          className="form-control"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a password.
        </Form.Control.Feedback>
      </Form.Group>
      <p className="text-danger">{passwordError}</p>
    </>
  );
}
export default PasswordInputField;