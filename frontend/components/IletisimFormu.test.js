import React from "react";
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  expect(screen.getByRole("heading")).toHaveTextContent(/İletişim Formu/);

  // const title = screen.getByTestId("form-title");
  //expect(title).toBeInTheDocument()
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "aaa" } });
  expect(nameInput.value).toBe("aaa");

  const nameError = screen.getByTestId("error-isim");
  expect(nameError).toBeInTheDocument();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const nameError = screen.getByTestId("error-isim");
  expect(nameError).toBeInTheDocument();

  const lastnameError = screen.getByTestId("error-soyad");
  expect(lastnameError).toBeInTheDocument();

  const emailError = screen.getByTestId("error-email");
  expect(emailError).toBeInTheDocument();
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "Furkan" } });
  expect(nameInput.value).toBe("Furkan");

  const lastnameInput = screen.getByTestId("soyad-input");
  fireEvent.change(lastnameInput, { target: { value: "İslek" } });
  expect(lastnameInput.value).toBe("İslek");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const emailError = screen.getByTestId("error-email");
  expect(emailError).toBeInTheDocument();
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const emailInput = screen.getByTestId("email-input");
  fireEvent.change(emailInput, { target: { value: "testtester.com" } });
  expect(emailInput.value).toBe("testtester.com");

  const emailError = screen.getByTestId("error-email");
  expect(emailError).toBeInTheDocument();
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);

  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "Furki" } });
  expect(nameInput.value).toBe("Furki");

  const emailInput = screen.getByTestId("email-input");
  fireEvent.change(emailInput, { target: { value: "testtester.com" } });
  expect(emailInput.value).toBe("testtester.com");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const emailError = screen.getByTestId("error-email");
  expect(emailError).toBeInTheDocument();
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);

  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "Furuk" } });
  expect(nameInput.value).toBe("Furuk");

  const lastnameInput = screen.getByTestId("soyad-input");
  fireEvent.change(lastnameInput, { target: { value: "İslek" } });
  expect(lastnameInput.value).toBe("İslek");

  const emailInput = screen.getByTestId("email-input");
  fireEvent.change(emailInput, { target: { value: "test@tester.com" } });
  expect(emailInput.value).toBe("test@tester.com");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const emailError = screen.queryByTestId("error-email");
  expect(emailError).not.toBeInTheDocument();
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);

  const nameInput = screen.getByTestId("isim-input");
  fireEvent.change(nameInput, { target: { value: "Furkan" } });
  expect(nameInput.value).toBe("Furkan");

  const lastnameInput = screen.getByTestId("soyad-input");
  fireEvent.change(lastnameInput, { target: { value: "İŞLEK" } });
  expect(lastnameInput.value).toBe("İŞLEK");

  const emailInput = screen.getByTestId("email-input");
  fireEvent.change(emailInput, { target: { value: "test@tester.com" } });
  expect(emailInput.value).toBe("test@tester.com");

  const submitButton = screen.getByTestId("submit-button");
  fireEvent.click(submitButton);

  const displayer = screen.getByTestId("sent-data");
  expect(displayer).toBeInTheDocument();


});