
const isAdminRole = (req, res, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'No existe usuario para verificar permisos'
        })
    }

    const { role, name } = req.user

    if (role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            msg: `El usuario ${name} no cuenta con permisos suficientes`
        })
    }

    next()
}

const hasRole = (...roles) => {

    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'No existe usuario para verificar permisos'
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: 'No tiene permisos suficientes'
            })
        }

        next()
    }

}

module.exports = {
    isAdminRole,
    hasRole
}