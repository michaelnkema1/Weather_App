from django.shortcuts import render
import requests

def index(request):
    if request.method == 'POST':
        city = request.POST['city']
        api_key = '5fb63cfbb76cfe63bfc8b54e0519a845'  # Replace with your actual API key
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
        response = requests.get(url)
        data = response.json()
        context = {
            'city': city,
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
        }
        return render(request, 'weather/index.html', context)
    else:
        return render(request, 'weather/index.html')

