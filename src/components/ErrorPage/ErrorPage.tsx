export function ErrorPage(): JSX.Element {
  const reloadPage = (): void => {
    window.location.reload();
  };

  return (
    <div>
      <p>Виникла непередбачувана помилка</p>
      <button type='button' onClick={reloadPage}>
        Перезавантажити сторінку
      </button>
    </div>
  );
}
