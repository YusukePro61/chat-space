json.content @message.content
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.name @message.user.name
json.img @message.image.url
json.id @message.id