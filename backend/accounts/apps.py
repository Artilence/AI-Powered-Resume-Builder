from django.apps import AppConfig

class AccountsConfig(AppConfig):
    """
    Configuration class for the accounts app.
    Ensures that Swagger extensions and other app-specific setup logic are initialized.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
    
    # Import Swagger extensions to ensure they are registered
        import accounts.swagger_extensions  # noqa: F401

