from certsapi.settings_utils import get_env_variable


# Private email
EMAIL_HOST = get_env_variable("EMAIL_HOST", "smtp.sendgrid.net")
EMAIL_PORT = get_env_variable("EMAIL_PORT", 587)
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True
EMAIL_HOST_USER = get_env_variable("EMAIL_HOST_USER", allow_none=True)
EMAIL_HOST_PASSWORD = get_env_variable("EMAIL_HOST_PASS", allow_none=True)
DEFAULT_EMAIL_SENDER = "oscarekireh@gmail.com"

# print(EMAIL_HOST)
# print(EMAIL_HOST_PASSWORD)
# print(DEFAULT_EMAIL_SENDER)
