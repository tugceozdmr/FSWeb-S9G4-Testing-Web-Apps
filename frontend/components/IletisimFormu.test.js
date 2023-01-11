import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

test('hata olmadan render ediliyor', () => {
    render(<IletisimFormu/>)
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu/>)
    const title=screen.getByTestId("form-title");
    expect(title).toBeInTheDocument();
    });
    

test('kullanici adini 5 karakterden az girdiğinde bir hata mesaji render ediyor.',
 async () => {
    render(<IletisimFormu/>)
    const isimAlani=screen.getByTestId("isim");
    fireEvent.change(isimAlani,{target:{ value:'hey'}})
   
    const isimHatasi=screen.getByTestId("error");
    expect(isimHatasi).toBeInTheDocument();
});



test('kullanici inputlari doldurmadiginda üc hata mesaji render ediliyor.', async () => {
    render(<IletisimFormu/>) 
    const submitButton=screen.getByTestId("submit-button")
    fireEvent.click(submitButton);
    
    const isimHatasi=screen.getByTestId("error");
    const soyadHatasi=screen.getByTestId("error-soyad");
    const mailHatasi=screen.getByTestId("error-mail"); 

    
    expect(isimHatasi).toBeInTheDocument();
    expect(soyadHatasi).toBeInTheDocument();
    expect(mailHatasi).toBeInTheDocument();
});


test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesaji render ediliyor.', async () => {
    render(<IletisimFormu/>) 
    const isimAlani=screen.getByTestId("isim");
    fireEvent.change(isimAlani,{target:{ value:'tugce'}})

    const soyadAlani=screen.getByTestId("soyad");
    fireEvent.change(soyadAlani,{target:{ value:'ozdemir'}})


    const submitButton=screen.getByTestId("submit-button")
    fireEvent.click(submitButton);

    const mailHatasi=screen.getByTestId("error-mail"); 

});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  
    render(<IletisimFormu/>) 
    const mailAlani=screen.getByTestId("mail");
    fireEvent.change(mailAlani,{target:{ value:'tugceozdemiir.com'}})
    expect(mailAlani.value).toBe("tugceozdemiir.com");

    const mailHatasi=screen.getByTestId("error-mail"); 
    expect(mailHatasi).toBeInTheDocument();
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    
    render(<IletisimFormu/>) 
   
    const isimAlani=screen.getByTestId("isim");
    fireEvent.change(isimAlani,{target:{ value:'tugce'}})
    expect(isimAlani).toBeInTheDocument('tugce');


    const mailAlani=screen.getByTestId("mail");
    fireEvent.change(mailAlani,{target:{ value:'tugceozdemiir.com'}})
    expect(mailAlani.value).toBe("tugceozdemiir.com");

    const submitButton=screen.getByTestId("submit-button")
    fireEvent.click(submitButton);

    
    const soyadHatasi=screen.getByTestId("error-soyad");
    expect(soyadHatasi).toBeInTheDocument();
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
   
    render(<IletisimFormu/>)
    
    const isimAlani=screen.getByTestId("isim");
    fireEvent.change(isimAlani,{target:{ value:'tugce'}})
    expect(isimAlani).toBeInTheDocument('tugce');

    const soyadAlani=screen.getByTestId("soyad");
    fireEvent.change(soyadAlani,{target:{ value:'ozdemir'}})
    expect(soyadAlani).toBeInTheDocument('ozdemir');

    const mailAlani=screen.getByTestId("mail");
    fireEvent.change(mailAlani,{target:{ value:'tugceozdemiir.com'}})
    expect(mailAlani.value).toBe("tugceozdemiir.com");

    const submitButton=screen.getByTestId("submit-button")
    fireEvent.click(submitButton);

    const mesajHatasi=screen.queryByTestId("error-mesaj");
    expect(mesajHatasi).not.toBeInTheDocument();



});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    render(<IletisimFormu/>)

    const isimAlani=screen.getByTestId("isim");
    fireEvent.change(isimAlani,{target:{ value:'tugce'}})
    expect(isimAlani).toBeInTheDocument('tugce');

    const soyadAlani=screen.getByTestId("soyad");
    fireEvent.change(soyadAlani,{target:{ value:'ozdemir'}})
    expect(soyadAlani).toBeInTheDocument('ozdemir');

    const mailAlani=screen.getByTestId("mail");
    fireEvent.change(mailAlani,{target:{ value:'tugceozdemiir.com'}})
  expect(mailAlani.value).toBe("tugceozdemiir.com");

    const submitButton=screen.getByTestId("submit-button")
    fireEvent.click(submitButton);

   const displayer=screen.getByTestId("sent-data");
    expect(displayer).toBeInTheDocument();

});
