class AuthsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def login
    dancer = Dancer.find_by(email: params[:email])
    if dancer.password_digest == params[:password]
        hmac_secret = 'my$ecretK3y'
        payload = { data:  dancer.email}
        token = JWT.encode payload, hmac_secret, 'HS256'
        puts token
        render json: {"auth-token": token }
    else
    render json: {error: "incorrect email or password"}        
    end
end

    def is_valid_session
        # decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
    end

    def register
        dancer = Dancer.new(first_name: params[:first_name], last_name: params[:last_name], gender: params[:gender], dance_style: params[:dance_style], email: params[:email], location: params[:location], password_digest: params[:password_digest])
        if dancer.save
            hmac_secret = 'my$ecretK3y'
            payload = { data:  dancer.email}
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {"auth-token": token}
        else
            render json: dancer.errors.full_messages, statis: 422
        end
    end

    def company_login
        company = Company.find_by(email: params[:email])
        if company.password_digest == params[:password]
            hmac_secret = 'my$ecretK3y'
            payload = { data:  company.email}
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {"company-auth-token": token}
        else 
            render json: {error: "Incorrect email or password"}
        end
    end

    def company_signup
        company = Company.new(company_type: params[:company_type], number_of_employees: params[:number_of_employees], name: params[:name],email: params[:email], bio: params[:bio], location: params[:location], logo: params[:logo], password_digest: params[:password])
        if company.save
            hmac_secret = 'my$ecretK3y'
            payload = { data:  company.email}
            token = JWT.encode payload, hmac_secret, 'HS256'
            render json: {"company-auth-token": token}
        else
            render json: company.errors.full_messages, statis: 422
        end
    end

end
