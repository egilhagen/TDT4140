from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
    
    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        # instance.password = validate_data['password']
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        instance.save()
        return instance

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
    # TODO: Make class password write only 
# grunn til first_name = ... --> https://stackoverflow.com/questions/49385119/create-user-takes-from-2-to-4-positional-arguments-but-6-were-given
    def create(self, validate_data):
        user = User.objects.create_user(
            validate_data['username'],
            validate_data['email'],
            validate_data['password'],  
            first_name = validate_data['first_name'],
            last_name = validate_data['last_name']    
            )
        return user

# Validere bare en bruker så 
class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
    