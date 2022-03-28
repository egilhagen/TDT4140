from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterUserSerializer, LoginUserSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterUserSerializer

    # Can take more arguments
    def post(self, request, *args, **kwargs):
        # Data som kommer inne her kommer i serializer
        serializers = self.get_serializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        user = serializers.save()

        # Serializert bruker
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            #Gjør at man kan logge inn umiddelbart ved registrering. Vet hvem man er utifra token. Kommer i header.
            "token": AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    # Can take more arguments
    def post(self, request, *args, **kwargs):
        # Data som kommer inne her kommer i serializer
        serializers = self.get_serializer(data=request.data)
        serializers.is_valid(raise_exception=False)
        user = serializers.validated_data
        # Serializert bruker
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            #Gjør at man kan logge inn umiddelbart ved registrering. Vet hvem man er utifra token. Kommer i header.
            "token": AuthToken.objects.create(user)[1]
        })
# Get User API

class UserAPI(generics.RetrieveAPIView):
    # Checks if token matches a login token
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
        
    def put(self, request, *args, **kwargs):

        user = self.request.user
        serializers = self.get_serializer(user,data=request.data)
        serializers.is_valid(raise_exception=True)
        
        user = serializers.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            #Gjør at man kan logge inn umiddelbart ved registrering. Vet hvem man er utifra token. Kommer i header.
            "token": AuthToken.objects.create(user)[1]
        })