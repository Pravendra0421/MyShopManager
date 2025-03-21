import styled from "styled-components";

interface ButtonProps {
  onClick?: () => void; // Function to handle clicks
  disabled?: boolean; // Disable button when needed
  children: React.ReactNode; // Button text (e.g., "Sell Now")
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    border: none;
    color: #fff;
    background-image: linear-gradient(45deg, #007bff, #00c6ff);
    border-radius: 20px;
    background-size: 100% auto;
    font-family: inherit;
    font-size: 0.9rem;
    padding: 0.5em 1.2em;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 600;
    min-width: 100px;

    @media (max-width: 768px) {
      font-size: 0.85rem;
      padding: 0.4em 1em;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      padding: 0.3em 0.8em;
    }

    &:hover {
      background-image: linear-gradient(45deg, #0056b3, #0093c4);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(0.97);
    }

    &:disabled {
      background: gray;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

export default Button;
