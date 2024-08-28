"""
@api_view(['GET','POST'])

def user(request):
    #request es un objeto que contiene muchos atributos, uno de esos es method, que me retorna
    #el metodo http que se utilizó en la peticion
    
    #OBTENER TODOS LOS USUARIOS
    if request.method == 'GET':
        user = Usuarios.objects.all()
        userSerializer = UsuarioSerializer(user, many = True)
        return Response(userSerializer.data,status=status.HTTP_200_OK) 
    
    #Crear Persona y Usuario
    if request.method == 'POST':
        #print(request.data)
        
        userSerializer = UsuarioSerializer(data = request.data)

        if userSerializer.is_valid():
            userSerializer.save()
            return Response(
                {"message" : "Usuario creado" , "Usuario" : userSerializer.data }, 
                status=status.HTTP_200_OK
                )
        
        return Response(
            {"message" : "Creacion cancelada" , "error" : userSerializer.errors}, 
            status=status.HTTP_400_BAD_REQUEST
            )



"""