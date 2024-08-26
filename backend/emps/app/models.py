from django.db import models

# Create your models here.

class emp(models.Model):
    name = models.CharField(max_length=100)
    job = models.CharField(max_length=100)
    years = models.DecimalField(max_digits=10,decimal_places=1)
    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.name