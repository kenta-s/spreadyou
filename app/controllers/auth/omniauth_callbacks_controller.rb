# frozen_string_literal: true

module Auth
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

    # monkey patched
    # https://github.com/lynndylanhurley/devise_token_auth/blob/master/app/controllers/devise_token_auth/omniauth_callbacks_controller.rb#L57
    def omniauth_success
      get_resource_from_auth_hash
      set_token_on_resource
      create_auth_params

      if confirmable_enabled?
        # don't send confirmation email!!!
        @resource.skip_confirmation!
      end

      sign_in(:user, @resource, store: false, bypass: false)

      User.transaction do
        @resource.save!
        twitter_credential = @resource.twitter_credential || TwitterCredential.new(user: @resource)
        twitter_credential.access_token = auth_hash.dig("credentials", "token")
        twitter_credential.secret_token = auth_hash.dig("credentials", "secret")
        twitter_credential.save!
      end

      yield @resource if block_given?

      render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
    end

  end

end
