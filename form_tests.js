import { Selector } from 'testcafe';

fixture`Inicio de Sesión`.page`http://localhost:5173`; // Ajusta la URL según sea necesario

test('Iniciar sesión sin entrada', async t => {
    const submitButton = Selector('#boton'); // Selecciona el botón por su id

    await t
        .click(submitButton)
        .expect(Selector('.ant-message-error').exists).notOk(); // Verifica que el mensaje de error NO existe
});

test('Iniciar sesión con datos incorrectos', async t => {
    const idInput = Selector('#id');
    const passwordInput = Selector('#password');
    const submitButton = Selector('#boton'); // Selecciona el botón por su id

    await t
        .typeText(idInput, '1234567')
        .typeText(passwordInput, 'contraseñaincorrecta')
        .click(submitButton)
        .expect(Selector('.ant-message-error').exists).ok();
});

test('Iniciar sesión con datos correctos', async t => {
    const idInput = Selector('#id');
    const passwordInput = Selector('#password');
    const submitButton = Selector('#boton'); // Selecciona el botón por su id

    await t
        .typeText(idInput, '92229300')
        .typeText(passwordInput, '@Ng3l_2021')
        .click(submitButton)
        .expect(Selector('.ant-message-success').exists).ok();
});
