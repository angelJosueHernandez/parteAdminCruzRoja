import { Selector } from 'testcafe';

fixture`Formulario de Historial Médico`.page`http://localhost:3000`; // La URL de tu aplicación

test('Prueba de envío de formulario con campos incorrectos', async t => {
  // No se proporcionan valores para los campos, lo que debería dejar el formulario en un estado inválido
  await t.click('input[type="submit"]');

  // Verifica que el mensaje de éxito no aparezca
  await t.expect(Selector('p').withText('Formulario Enviado con Exito').exists).notOk();

  // Verifica que el formulario no se envíe (por ejemplo, que no haya una redirección a una nueva página)
  // Aquí puedes agregar una verificación adicional según el comportamiento de tu aplicación

  // También puedes verificar que el botón de envío esté deshabilitado
  const submitButton = Selector('input[type="submit"]');
  await t.expect(submitButton.hasAttribute('disabled')).ok();
});
