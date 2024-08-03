import ReactDOM from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return ReactDOM.createPortal(
    <div className='flexCenter fixed inset-0 bg-black bg-opacity-50'>
      <div className='bg-white px-[10rem] py-[6rem] rounded-lg shadow-lg relative'>
        {children}
        <button
          className='absolute bottom-[1rem] right-[1rem] text-white bg-orange-2 py-[.5rem] px-[1rem] rounded hover:bg-orange-1'
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>,
    document.getElementById('portal')!
  );
}

export default Modal;
