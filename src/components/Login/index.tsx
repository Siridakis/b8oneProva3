import React, { useRef, useEffect } from 'react'
import '../../styles/style.css'
import { useMutation } from '@apollo/client';
import { SIGN_IN } from 'src/grapql/queries/sign-in';


const Login = () => {
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const [SignIn, { data, loading, error }] = useMutation(SIGN_IN); 

    async function handleSignInClick(e: React.FormEvent) {
        e.preventDefault()
        console.log("clicou")
        const emailValue = emailInput.current?.value
        const passwordValue = passwordInput.current?.value
        console.log({emailValue, passwordValue})
        
		try {
			await SignIn({
			    variables: {
				    input: {
					    email: emailValue,
					    password: passwordValue 
				    } 
				} 
			})
		} catch(e) {
			alert("E-mail e/ou senha inválidos")
		}

    }

    function placeholderHandler() {
        return
    }

	useEffect(() => {
	    
		if(data) {
			const {email:userEmail,name:userName} = data?.signIn?.user;
			localStorage.setItem("userEmail", userEmail);
			localStorage.setItem("userName", userName);
			document.cookie=`userToken=${data?.signIn?.token}`;
			window.open("/dashboard");
		}
	},[data])


	if (loading) {
		return (
            <span className="main__text">
               Submitting...
            </span>
		)
	}
    if (error) console.log(error.message)

    return (
        <>
            <div className="main__header">
                <span className="main__title">Academy <span className="main__title--green">Store</span></span>
            </div>
            <div className="main">
                <span className="main__text">
                    Olá, entre com e-mail e senha.
                </span>
                <div className="main__form">
                    <span className="main__email--text">
                        Seu e-mail
                    </span>
                    <input className="main__email--input" ref={emailInput} type="email" name="" id="" placeholder="exemplo@email.com"/>
                    <span className="main__email--warning">
                        Este e-mail não existe, você tem outro?
                    </span>
                    <span className="main__password--text">
                        Senha
                    </span>
                    <div className="main__password__sub-block">
                        <input className="main__password--input" ref={passwordInput} type="password" name="" id="" placeholder="Digite sua senha"/>
                        <input type="checkbox" className="main__password--hide-checkbox" id="hide_cb" checked={true} onChange={placeholderHandler}/>
                        <label className="main__password--label" htmlFor="hide_cb">
                            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12C1 12 5.36364 3 13 3C20.6364 3 25 12 25 12C25 12 20.6364 21 13 21C5.36364 21 1 12 1 12Z" stroke="#425DC7" strokeWidth="1.5"/>
                                <path d="M13 15.3745C14.8075 15.3745 16.2727 13.8635 16.2727 11.9995C16.2727 10.1356 14.8075 8.62451 13 8.62451C11.1925 8.62451 9.72729 10.1356 9.72729 11.9995C9.72729 13.8635 11.1925 15.3745 13 15.3745Z" stroke="#142159" strokeWidth="1.5"/>
                            </svg>                        
                        </label>
                        <label className="main__password--label-checked" htmlFor="hide_cb">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3127 15.3127C15.0131 15.6343 14.6518 15.8922 14.2503 16.071C13.8489 16.2499 13.4155 16.3461 12.9761 16.3539C12.5367 16.3616 12.1002 16.2808 11.6927 16.1162C11.2852 15.9516 10.915 15.7066 10.6042 15.3958C10.2934 15.085 10.0484 14.7149 9.88383 14.3073C9.71923 13.8998 9.63839 13.4633 9.64615 13.0239C9.6539 12.5845 9.75008 12.1511 9.92896 11.7497C10.1078 11.3482 10.3657 10.9869 10.6873 10.6873M19.48 19.48C17.6152 20.9015 15.3445 21.6889 13 21.7273C5.36364 21.7273 1 13 1 13C2.35697 10.4712 4.23906 8.26176 6.52 6.52001L19.48 19.48ZM10.7091 4.53455C11.46 4.35878 12.2288 4.27092 13 4.27273C20.6364 4.27273 25 13 25 13C24.3378 14.2388 23.5481 15.4052 22.6436 16.48L10.7091 4.53455Z" stroke="#425DC7" strokeWidth="1.5"/>
                                <path d="M1 1L25 25" stroke="#142159" strokeWidth="1.5"/>
                            </svg>                        
                        </label>
                    </div>
                    <div className="main__sub-block">
                        <div className="main__checkbox__block">
                            <input className="main__checkbox__input" onChange={placeholderHandler} type="checkbox"/>
                            <span className="main__checkbox__text">
                                Manter conectado
                            </span>
                        </div>
                        <a href="www.google.com" className="main__link"> {/* MODIFICAR ESSE LINK */}
                            <span className="main__link__text">
                                Esqueci minha senha
                            </span>
                        </a>
                    </div>
                    <button onClick={(e) => handleSignInClick(e)} className="main__button" type="button">
                        <span className="main__button__text">
                            Entrar
                        </span>
                    </button>
                    <div className="main__sub-block--centered">
                        <a href="www.google.com" className="main__link2">
                            <span className="main__link2__text">
                                Não possui conta? Cadastre-se!
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login