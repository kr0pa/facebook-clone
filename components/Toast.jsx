import { useDispatch, useSelector } from "react-redux";
import { selectSnackbar, snackbarStatus } from "../slices/snackbarSlice";

function Toast({ open, message, time }) {
  const dispatch = useDispatch();
  const selectData = useSelector(selectSnackbar);
  let timeout;
  let status = false;

  const metoda = () => {
    if (open) {
      timeout = setTimeout(() => {
        dispatch(
          snackbarStatus({
            ...selectData,
            open: false,
          })
        );

        status = true;
      }, 6000);

      if (status) {
        clearInterval(timeout);
        status = false;
      }

      return (
        <div
          className={`${
            !open && "hidden"
          } fixed bottom-[0] left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 dark:text-white bg-gray-300 p-4 min-w-min dark:bg-[#434547] rounded-lg animate-toast`}
        >
          <p>{message}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return <>{metoda()}</>;
}

export default Toast;
