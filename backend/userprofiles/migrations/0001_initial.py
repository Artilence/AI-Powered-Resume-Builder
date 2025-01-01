# Generated by Django 5.1.4 on 2024-12-30 13:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_name', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('position', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=100)),
                ('phone', models.CharField(max_length=15)),
                ('address', models.CharField(blank=True, max_length=255)),
                ('summary', models.TextField(blank=True)),
                ('experiences', models.JSONField(blank=True, default=list)),
                ('education', models.JSONField(blank=True, default=list)),
                ('skills', models.JSONField(blank=True, default=list)),
                ('projects', models.JSONField(blank=True, default=list)),
                ('certifications', models.JSONField(blank=True, default=list)),
                ('languages', models.JSONField(blank=True, default=list)),
                ('hobbies', models.JSONField(blank=True, default=list)),
                ('social_links', models.JSONField(blank=True, default=list)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profiles', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
