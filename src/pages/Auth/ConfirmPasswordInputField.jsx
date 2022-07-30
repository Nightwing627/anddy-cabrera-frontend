import { Form} from "react-bootstrap";

function ConfirmPasswordInputField({
  handleValidation,
  handlePasswordChange,
  confirmPasswordValue,
  confirmPasswordError,
}) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="mb-2 text-muted" for="confirmPassword">
        Confirm Password
        </Form.Label>
        <Form.Control
          type="password"
          value={confirmPasswordValue}
          onChange={handlePasswordChange}
          onKeyUp={handleValidation}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="form-control"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please confirm password.
        </Form.Control.Feedback>
      </Form.Group>
      <p className="text-danger">{confirmPasswordError}</p>
    </>
  );
}
export default ConfirmPasswordInputField;