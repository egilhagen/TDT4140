from enum import Enum


class LocationChoices(Enum):
    OS = "Oslo"
    BR = "Bergen"
    TR = "Trondheim"
    BO = "Bodø"

    @classmethod
    def choices(cls):
        print(tuple((i.name, i.value) for i in cls))
        return tuple((i.name, i.value) for i in cls)

class TypeChoices(Enum):
    Consert = "Concert"
    Cinema = "Cinema"
    Theater = "Theater"
    Other = "Other"

    @classmethod
    def choices(cls):
        print(tuple((i.name, i.value) for i in cls))
        return tuple((i.name, i.value) for i in cls)

class SaleOrBuy(Enum):
    Sale="Sell"
    Buy="Buy"

    @classmethod
    def choices(cls):
        print(tuple((i.name, i.value) for i in cls))
        return tuple((i.name, i.value) for i in cls)